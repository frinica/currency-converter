import { useState } from "react"

export const Converter = ({
  emitAmount,
}: {
  emitAmount: (arg: number | undefined) => void
}) => {
  const [amount, setAmount] = useState<number | undefined>(undefined)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    emitAmount(amount)
  }

  return (
    <>
      <section className="sectionWrapper">
        <h3>Convertion time</h3>
        <form onSubmit={handleSubmit}>
          <label className="convertLabel">SEK</label>
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={onChange}
            className="formInput"
          />
          <button type="submit" className="button">
            Convert
          </button>
        </form>
      </section>
    </>
  )
}
