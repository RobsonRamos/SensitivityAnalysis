import traceback
from src.data.loader  import DataLoader
from src.domain.models import RequestSettings
from src.core.linear_model import LinearModel
from src.api.startup import Startup 

class App:
    try:
        loader = DataLoader()
        data = loader.load_data(RequestSettings())
        
        model = LinearModel()
        model.generate_model(*data)

        startup = Startup()
        startup.startAPI()  
    except:
        traceback.print_exc()
        print("Looks like something went wrong :( ")