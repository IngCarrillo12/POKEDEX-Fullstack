import { AppRouter } from "./AppRouter";
import { PokemonProvider } from "./context/PokemonProvider";
import { AuthProvider } from "./context/AuthProvider"

function App(){
  return (
  <AuthProvider>
  <PokemonProvider>
    <AppRouter/>
  </PokemonProvider>
  </AuthProvider>
  )
}
export default App

