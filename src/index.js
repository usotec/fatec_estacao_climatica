import 'bootstrap/dist/css/bootstrap.css'
import ReactDom from 'react-dom'
import React from 'react'

class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            estacao: null,
            data: null,
            icone: null,
            mensagemDeErro: null,
        }
        console.log('construtor')
    }

    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano , 5, 21)
        const d2 = new Date(ano , 8, 24)
        const d3 = new Date(ano , 11, 22)
        const d4 = new Date(ano , 3, 21)
        const sul = latitude < 0
        if (data >= d1 && data < d2){
            return sul ? 'Inverno' : 'Verao'
        }
        if (data >= d2 && data <d3){
            return sul ? 'Primavera' : 'Outono'
        }
        if (data >= d3 && data < d4){
            return sul ? 'Verao' : 'Inverno'
        }
        return sul ? 'Outono' : 'Primavera'
    }

    icones = {
        "Primavera" : "fa-seedling",
        "Verao" : "fa-umbrella-beach",
        "Outono" : "fa-tree",
        "Inverno" : "fa-snowman"
    }

    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                let data = new Date()
                let estacao = this.obterEstacao(data, position.coords.latitude)
                let icone = this.icones[estacao]
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    data: data.toLocaleDateString(),
                    estacao: estacao,
                    icone: icone
                })
            },
           (err) => {
               console.log(err)
               this.setState ( {mensagemDeErro: 'Teste novamente mais tarde'} )
           }
        )
    }

    componentDidMount(){
        console.log("componentDidMount")
    }

    componentDidUpdate(){
        console.log("componentDidUpdate")
    }

    componentWillUnmount(){
        console.log("ccomponentWillUnmount")
    }

 render(){
     console.log("render")
    return (
        <div className='container mt-2 border p-5'>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                          <div className="d-flex align-items-center border rounded mb-2" style={{height: '6rem'}}>
                              <i className={`fas fa-5x ${this.state.icone}`}></i>
                              <p className="w-75 ms-3 text-center fs-1"> {this.state.estacao} </p>
                          </div>
                          <div>
                              <p className="text-center">
                                  {
                                      this.state.latitude?
                                        `Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}.`
                                      :
                                      this.state.mensagemDeErro?
                                         `${this.state.mensagemDeErro}` 
                                      :
                                        `Clique no botão para saber a sua estação climática.`
                                  }
                              </p>
                          </div>
                          <button
                              onClick={this.obterLocalizacao} 
                              className="btn btn-outline-primary w-100 mt-2">
                                Qual a Minha Estação?
                          </button>

                          <button className="btn btn-outline-danger w-100 mt-2"
                          onClick={() => {
                              ReactDom.unmountComponentAtNode(document.querySelector('#root'))
                          }}>
                          Perigo!!!
                          </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )

 } 

}

ReactDom.render(
    <App/>,
    document.querySelector('#root')
)    