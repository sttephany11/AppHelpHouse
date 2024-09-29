// import Routes from './src/routes'
import Index from './src/routes/index';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';


export default function App(){
    return ( 
        <ApplicationProvider {...eva} theme={eva.light}> 
              <Index />
        </ApplicationProvider>
    


    );

}

