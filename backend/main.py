from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
from datetime import datetime
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PriceRange(BaseModel):
    min: float
    max: float

class SearchCriteria(BaseModel):
    location: str
    priceRange: PriceRange
    propertyType: List[str]
    bedrooms: int
    bathrooms: int

# Initialize an empty DataFrame to store MLS data
mls_data = pd.DataFrame()

def load_mock_data():
    """Load mock MLS data into the DataFrame"""
    mock_data = {
        'id': range(1, 21),
        'address': [f'{1234 + i} Example Street, City, State' for i in range(20)],
        'price': [500000 + (i * 50000) for i in range(20)],
        'bedrooms': [(3 + (i % 3)) for i in range(20)],
        'bathrooms': [(2 + (i % 2)) for i in range(20)],
        'sqft': [(1800 + (i * 100)) for i in range(20)],
        'propertyType': ['Single Family' if i % 2 == 0 else 'Condo' for i in range(20)],
        'location': ['Downtown' if i % 3 == 0 else 'Suburb' if i % 3 == 1 else 'Rural' for i in range(20)]
    }
    return pd.DataFrame(mock_data)

@app.on_event("startup")
async def startup_event():
    global mls_data
    mls_data = load_mock_data()

@app.post("/search")
async def search_listings(criteria: SearchCriteria):
    try:
        # Filter the DataFrame based on search criteria
        mask = (
            (mls_data['location'].str.contains(criteria.location, case=False)) &
            (mls_data['price'] >= criteria.priceRange.min) &
            (mls_data['price'] <= criteria.priceRange.max) &
            (mls_data['bedrooms'] >= criteria.bedrooms) &
            (mls_data['bathrooms'] >= criteria.bathrooms)
        )
        
        if criteria.propertyType:
            mask &= mls_data['propertyType'].isin(criteria.propertyType)
        
        results = mls_data[mask]
        
        # Convert DataFrame to list of dictionaries
        listings = results.to_dict('records')
        
        # Add image URLs (in a real app, these would come from the MLS database)
        for listing in listings:
            listing['imageUrl'] = 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60'
            listing['description'] = 'Beautiful home in a great neighborhood...'
        
        return listings
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)