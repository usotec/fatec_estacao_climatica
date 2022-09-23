import 'bootstrap/dist/css/bootstrap.css'
import ReactDom from 'react-dom'
import React from 'react'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'

class App extends React.Component {

    constructor(props){
        super(props)
       // this.state = {
        //    latitude: null,
         //   longitude: null,
        //    estacao: null,
        //    data: null,
         //   icone: null,
         //   mensagemDeErro: null,
     //   }
       console.log('construtor')
    }

    state = {
        latitude: null,
        longitude: null,
        estacao: null,
        data: null,
        icone: null,
        mensagemDeErro: null,
    }

    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano , 5, 21)
        const d2 = new Date(ano , 8, 22)
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
        this.obterLocalizacao()
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
                    {
                    (!this.state.mensagemDeErro && !this.state.latitude)
                    ?
                    <Loading />
                    :
                    this.state.mensagemDeErro ?
                    <p className="border rounded p-2 fs-1">
                        É preciso dar permissão para acesso a Localização.
                    </p>
                    :
                     <EstacaoClimatica 
                        icone={this.state.icone}
                        estacao={this.state.estacao}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        //data={this.state.data}
                        //mensagemDeErro={this.state.mensagemDeErro}
                        obterLocalizacao={this.obterLocalizacao}
                     />}
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