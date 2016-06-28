import React from 'react'
import Footer from './Footer'
import AddWine from '../containers/AddWine'
import VisibleWineList from '../containers/VisibleWineList'

const App = () => (
  <div>
    <AddWine />
    <VisibleWineList />
    <Footer />
  </div>
)

export default App
