# Sensitivity Analysis

## How to execute the code


```python
   $ cd backend 
   $ python3 -u app.py 
```
 

## Using the API

When the data loader process finishs an API is exposed in the address ``localhost:5000/SensitivityService``

To use the API its necessary to execute a GET request (using the address above) containing the following parameters:
- shift_gold: the shock to be applied to the gold commodity
- shift_copper: the shock to be applied to the copper commodity

### Sample request
http://localhost:5000/SensitivityService?shift_gold=50&shift_copper=10

###  

The API returns a table containing the sensitivity results

## Front End
The project constains also a web application to simulate and show the results.
The source code is in the folder **frontend**
