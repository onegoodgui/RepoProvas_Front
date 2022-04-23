import Loading from "../icons";
import { Input, Content, Button, Form, Title, SignInLink } from "../style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RepoProvas from '../../../images/repoProvas.svg'
import { api } from "../../../services/api";

export default function SignUp(){


  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
    
    
  const loginItems = [
    { placeholder: 'E-mail', type: 'email', state: setEmail },
    { placeholder: 'Senha', type: 'password', state: setPassword },
    { placeholder: 'Confirme a senha', type: 'password', state: setConfirmPassword }

  ];
    
  async function RequestSignUp(e) {
    e.preventDefault();
    setIsLoading(true);

    if (confirmPassword !== password) {
      alert('Confirmação não respeitada. Redigite a senha');
      return
    }

    const user = { name: name, email: email, password: password };

    try{
      const promise = await api.signUp(user);
      console.log(promise.data);
      setIsLoading(false);
      navigate('/')
    }
    catch(error){
          
      console.log(error)
      setIsLoading(false);
      alert('Erro!');
    }
  }
    
  function ButtonContent() {
    if (isLoading === true) {
      return (
        <Loading color="#FFF" height={40} width={40} />
      )
    }
    else {
      return (<span>Cadastrar</span>)
    }
  }
    
  return (
      <>
        <Content>
  
          <Title src={RepoProvas}/>
          <Form onSubmit={RequestSignUp}>
            <SignUpInputs loginItems={loginItems} isLoading={isLoading}/>
            <Button type="submit">
              <ButtonContent />
            </Button>
          </Form>
          <SignInLink onClick={() => navigate('/')}>Já possui cadastro? Faça o login!</SignInLink>
        </Content>
    </>
  )      
}


function SignUpInputs({loginItems, isLoading}){

  return(
    <>
      {loginItems.map((item, index) => 
        <Input 
          opacity={isLoading === true ? 0.8 : 1} 
          disabled={isLoading === true ? true : false} 
          placeholder={item.placeholder} 
          type={item.type} 
          key={index} 
          onChange={(e) => { item.state(e.target.value) }}>
        </Input>)  
      }
    </>
  )
}