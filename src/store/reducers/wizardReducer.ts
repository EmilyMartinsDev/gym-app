import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type WizardForm = {
 formId:string
 userId:string
 content: {
  id    :string              
  name  :string               
  email   :string

  weight     :number          
  height   :number      
  gender:'F' | 'M'      
  age:number  

  body_fat_percentage   :number
  goal :string                 
  training_time      :number   
  muscle_group_target :string 
      
  activity_level: number      
  training_frequency:number   
  level?:string
 }
}


type ProdutoEstado = {
  items: WizardForm[]
  position: number
}
const initialState: ProdutoEstado = {
  items: [],
  position: 1
}

const wizard = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   
   next: (state)=>{
        if(state?.position! < 3){
            state.position = state.position! +1;
        }
   },

   back: (state)=>{
    if(state?.position! > 1){
        state.position = state.position! - 1;
    }
}}
 
})

export const {next, back} = wizard.actions
export default wizard.reducer
