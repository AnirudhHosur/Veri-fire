import requests

# Use your verified API key
API_KEY = 'AIzaSyApMWSCbDm2EKKMkC1SyMcLDc-wWp5J2yk'

def find_nearby_places(location, place_type, radius=1000):
    """
    Find nearby places based on location and place type.
    
    :param location: Tuple of latitude and longitude (lat, lng)
    :param place_type: Type of place to search (e.g., 'hotel', 'gas_station')
    :param radius: Search radius in meters
    :return: List of places
    """
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    
    params = {
        'location': f"{location[0]},{location[1]}",
        'radius': radius,
        'type': place_type,
        'key': API_KEY
    }
    
    response = requests.get(url, params=params)
    results = response.json().get('results', [])
    
    places = []
    for result in results:
        place = {
            'name': result.get('name'),
            'address': result.get('vicinity'),
            'maps_link': f"https://www.google.com/maps/place/?q=place_id:{result.get('place_id')}"
        }
        places.append(place)
    
    return places

# Example usage with University of Alberta location
if __name__ == "__main__":
    location = (53.5232, -113.5263)  # Coordinates for University of Alberta
    radius = 1500  # Search within 1500 meters
    
    hotels = find_nearby_places(location, 'hotel', radius)
    petrol_pumps = find_nearby_places(location, 'gas_station', radius)
    restaurants = find_nearby_places(location, 'restaurant', radius)
    hospitals = find_nearby_places(location, 'hospital', radius)
    
    print("Nearby Hotels:")
    for hotel in hotels:
        print(f"Name: {hotel['name']}, Address: {hotel['address']}, Map: {hotel['maps_link']}")
    
    print("\nNearby Petrol Pumps:")
    for petrol_pump in petrol_pumps:
        print(f"Name: {petrol_pump['name']}, Address: {petrol_pump['address']}, Map: {petrol_pump['maps_link']}")

    print("\nNearby Restaurants:")
    for restaurant in restaurants:
        print(f"Name: {restaurant['name']}, Address: {restaurant['address']}, Map: {restaurant['maps_link']}")

    print("\nNearby Hospitals:")
    for hospital in hospitals:
        print(f"Name: {hospital['name']}, Address: {hospital['address']}, Map: {hospital['maps_link']}")
