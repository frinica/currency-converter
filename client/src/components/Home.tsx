import { useState } from "react"
import { Search } from "./Search"
import { List } from "./List"
import { Converter } from "./Converter"

export const Home = ({ props }: { props: string }) => {
  const token = props
  const [data, setData] = useState<Object[]>([])
  const [convertAmount, setConvertAmount] = useState<number | undefined>(
    undefined
  )

  const dataFromChild = (emittedData: Object) => {
    if (data) {
      setData((oldArr) => [...oldArr, emittedData])
    } else {
      setData([emittedData])
    }
  }

  const emittedAmount = (amount: number | undefined) => {
    setConvertAmount(amount)
  }

  return (
    <>
      <h1>Welcome!</h1>
      <Search userToken={token} dataFromChild={dataFromChild} />
      <Converter emitAmount={emittedAmount} />
      <List props={data} userToken={token} amount={convertAmount} />
    </>
  )
}
