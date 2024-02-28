import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Grid, Typography, Box } from '@mui/material'
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  } = useContext(CurrencyContext);

  const [resultCurrency, setResultCurrency] = useState(0)
  const codeFromCurrency = fromCurrency.split("")[1]
  const codeToCurrency = toCurrency.split("")[1]
  console.log(resultCurrency)
 //не показывает сконвертированное значение 
  useEffect(() => {
    if (firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "fca_live_jqLv19Pd6tSXjARP1Fhaj57sN9bc3QNYBdIaRK7u",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(responce => setResultCurrency(responce.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 50px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{marginBottom: "2rem"}}>Stay Ahead with Accurate Conversions</Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From"/>
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To"/>
      </Grid>

      { firstAmount ? (
      <Box sx={{textAlign: "left", marginTop: "1rem"}}>
        <Typography>{firstAmount} {fromCurrency} =</Typography>
        <Typography 
          variant='h5' 
          sx={{marginTop: "5px", fontWeight: "bold"}}>
            {resultCurrency*firstAmount} {toCurrency}
        </Typography>
      </Box>) : "" }
    </Container>
  )
}

export default App
