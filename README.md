# Sensitivity Analysis

Sensitivity Analysis is a project to analyze how Barrick Gold Corp (GOLD US Equity) P/E changes due to gold and copper price changes.

This study supposes a linear relationship between GOLD US price, Gold futures prices and Copper futures prices, i.e. GOLD US = x*Gold + y*Copper + b.

About GOLD US: Barrick Gold is one of the world's top gold and copper producers, with proved reserves among the largest in the industry. It has interests in some 15 producing gold mines in ten countries, including the United States, Canada, South America, Australia, and Africa.

## How to execute the code


```python
   $ cd backend 
   $ pip install -r requirements.txt
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


## Features

![alt text](https://github.com/RobsonRamos/SensitivityAnalysis/raw/main/imgs/input.png)

![alt text](https://github.com/RobsonRamos/SensitivityAnalysis/raw/main/imgs/results.png)

![alt text](https://github.com/RobsonRamos/SensitivityAnalysis/raw/main/imgs/metrics.png)

![alt text](https://github.com/RobsonRamos/SensitivityAnalysis/raw/main/imgs/predicted.png)
