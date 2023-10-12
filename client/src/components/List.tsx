export const List = ({ props }: { props: Object[] }) => {
  const countriesInList = props
  const listArray = countriesInList.map((country: any) => (
    <tr key={country.fullName}>
      <td>{country.fullName}</td>
      <td>{country.population}</td>
      <td>{Object.keys(country.currencies)}</td>
    </tr>
  ))

  return (
    <>
      <h3>List</h3>
      <table>
        <tr>
          <td>Full name</td>
          <td>Population</td>
          <td>Currencies</td>
        </tr>
        {listArray}
      </table>
    </>
  )
}
