/* eslint-disable no-mixed-operators */
/* eslint-disable no-alert */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

// import dos estilos e componentes
import Box from '../../components/Box';
import Button from '../../components/Button';
import './styles.css';

// Api
const url = 'https://economia.awesomeapi.com.br/JSONP/USD-BRL';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValor: 0,
      impostoEstadual: 0,
      cotacaoValor: (0.00).toFixed(2),
      iofCartao: 6.38,
      iofDinheiro: (1.10).toFixed(2),
      dolarComImposto: (0.00).toFixed(2),
      dolarSemImposto: (0.00).toFixed(2),
      realComImpostoCartao: (0.00).toFixed(2),
      realComImpostoDinheiro: (0.00).toFixed(2),
      realSemImposto: (0.00).toFixed(2),
    };
    this.converter = this.converter.bind(this);
    this.cotacao = this.cotacao.bind(this);
    this.cotacao();
  }

  // A função cotacao() busca na api o valor bid e seta na cotacaoValor
  // A função é chamada assim que a página é construida

  cotacao() {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const cotacaoValor = parseFloat(json[0].bid).toFixed(2);
        this.setState({ cotacaoValor });
      });
  }

  // Função que que calcula o imposto e a cotação e converte setando no status
  async converter() {
    const dolarComImposto = await ((parseFloat((this.state.inputValor
      * (this.state.impostoEstadual / 100)) + (this.state.inputValor)))).toFixed(2);

    // Condional para não deixar o valor NaN ser setado caso alguém digite um
    // valor não numérico
    if (dolarComImposto !== 'NaN') {
      const dolarSemImposto = (parseFloat(this.state.inputValor)).toFixed(2);

      this.setState({ dolarSemImposto });
      this.setState({ dolarComImposto });

      const realComImpostoDinheiro = ((this.state.dolarComImposto)
        * (parseFloat(this.state.cotacaoValor) + (parseFloat(this.state.cotacaoValor)
          * this.state.iofDinheiro / 100))).toFixed(2);
      this.setState({ realComImpostoDinheiro });

      const realComImpostoCartao = await ((this.state.dolarComImposto
        * (parseFloat(this.state.cotacaoValor)))
        + ((this.state.dolarComImposto) * (parseFloat(this.state.cotacaoValor))
        * (this.state.iofCartao / 100))).toFixed(2);
      this.setState({ realComImpostoCartao });

      const realSemImposto = await ((this.state.dolarComImposto)
        * (parseFloat(this.state.cotacaoValor))).toFixed(2);
      this.setState({ realSemImposto });
    } else {
      alert('O valor digitado não foi um número válodo. Por favor, tente novamente.');
    }

    this.setState({ inputValor: 0, impostoEstadual: 0 });
    document.getElementById('montante').value = '';
    document.getElementById('imposto').value = '';
  }

  render() {
    return (

      <Card id="main" className="animacao">
        <header className="cabecalho">
          <h1>Conversor Stone</h1>
        </header>
        <h2>USD para BRL</h2>
        <form id="formButton">
          <Card className="inputs">
            <Box id="inputs">

              {/* inputs que recebem respectivamente o valor em dolár e o
                imposto em porcentagem com um botão que chama a função
                converter () */}

              <input
                type="text"
                onChange={(event) => this.setState({
                  inputValor: parseFloat((event.target.value)
                    .toString().replace(',', '.')),
                })}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') this.converter();
                }}
                id="montante"
                name="montante"
                placeholder="Montante $"
              />

              <input
                type="text"
                name="imposto"
                id="imposto"
                onChange={(event) => this.setState({
                  impostoEstadual: parseFloat((event.target.value)
                    .toString().replace(',', '.')),
                })}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') this.converter();
                }}
                placeholder="Imposto %"
              />
            </Box>
          </Card>
          <Button
            id="btn"
            onClick={this.converter}
            className="btn"
          >
consultar

          </Button>


        </form>

        {/* prints dos resultados na tela */}

        <Box id="resultados">

          <ul>
            <Card className="cardValor">
              <li>
                <p>Cotação Dolar</p>
                <p className="valor">
R$:
                  {' '}
                  { (this.state.cotacaoValor).toString().replace('.', ',') }

                </p>
              </li>
            </Card>
            <Card className="cardValor">
              <li>
                <p>IOF de transações internacionais</p>
                <p className="valor">
                  { (this.state.iofCartao).toString().replace('.', ',') }
%

                </p>
              </li>
            </Card>
            <Card className="cardValor">
              <li>
                <p>IOF da compra de dólar</p>
                <p className="valor">
                  { (this.state.iofDinheiro).toString().replace('.', ',') }
%

                </p>
              </li>
            </Card>
            <Card className="cardValor">
              <li>
                <p>Total em dólar sem imposto</p>
                <p className="valor">
$:
                  {' '}
                  { (this.state.dolarSemImposto).toString().replace('.', ',') }

                </p>
              </li>
            </Card>
            <Card className="cardValor">
              <li>
                <p>Total em dólar com imposto</p>
                <p className="valor">
$:
                  {' '}
                  { (this.state.dolarComImposto).toString().replace('.', ',') }

                </p>
              </li>
            </Card>
            <Card className="cardValor">
              <li>
                <p>Total em real sem imposto</p>
                <p className="valor">
R$:
                  {' '}
                  { (this.state.realSemImposto).toString().replace('.', ',') }

                </p>
              </li>
            </Card>
            <Card className="cardValor">
              <li>
                <p>Total em real com imposto cartão</p>
                <p className="valor">
R$:
                  {' '}
                  { (this.state.realComImpostoCartao).toString().replace('.', ',') }

                </p>
              </li>
            </Card>
            <Card className="cardValor">
              <li>
                <p>Total em real com imposto dinheiro</p>
                <p className="valor">
R$:
                  {' '}
                  { (this.state.realComImpostoDinheiro).toString().replace('.', ',') }

                </p>
              </li>
            </Card>
          </ul>
        </Box>
      </Card>
    );
  }
}
