import Loading from "../icons";
import { Input, Content, Button, Form, Title, SignInLink } from "../style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import RepoProvas from '../../../images/repoProvas.svg'
import { api } from "../../../services/api";

export default function SignIn(){


    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    
    
    const loginItems = [
      { placeholder: 'E-mail', type: 'email', state: setEmail },
      { placeholder: 'Senha', type: 'password', state: setPassword }
    
    ];
    
    async function RequestSignUp(e) {
      e.preventDefault();
      setIsLoading(true);
    
      const user = { email: email, password: password };
    
      try{
          const promise = await api.signIn(user);
          const promiseData = promise.data;
          login(promiseData.token);
          setIsLoading(false);

          navigate('/homepage')
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
        return (<span>Login</span>)
      }
    }
    
    return (
      <>
        <Content>
    
          <Title src={RepoProvas}/>

          <Form onSubmit={RequestSignUp}>
            <SignInInputs loginItems={loginItems} isLoading={isLoading}/>
            <Button type="submit">
              <ButtonContent />
            </Button>
          </Form>

          <SignInLink onClick={() => navigate('/sign-up')}>Não possui cadastro? Cadastre-se!</SignInLink>
        </Content>
    </>
    )      
}


function SignInInputs({loginItems, isLoading}){

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