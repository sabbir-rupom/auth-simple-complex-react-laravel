import AppRouter from './routes/Router'
import '../assets/styles/Global.scss'
import MenuNavigation from './layouts/MenuNavigation'

function App () {
  return (
    <>
      <MenuNavigation />
      <AppRouter />
      <div>Footer</div>
    </>
  )
}

export default App
