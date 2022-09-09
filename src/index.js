import 'bootstrap/dist/css/bootstrap.css'
import ReactDom from 'react-dom'
import React from 'react'

class App extends React.Component {

 render(){

    return (
        <div>
            Meu App
        </div>
    )

 } 

}

ReactDom.render(
    <App/>,
    document.querySelector('#root')
)    