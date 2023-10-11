import { Search } from "./Search"

export const Home = ({ props }: { props: string }) => {
  const token = props
  return (
    <>
      <h1>Welcome!</h1>
      <Search props={token} />
    </>
  )
}
