import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import login from './pages/login'
import book from './pages/book'
import list from './pages/list'


const Routes = createAppContainer(
    createSwitchNavigator({
        login,
        list,
        book
    })
)

export default  Routes;