import React,{Component} from 'react';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';


class Drawer extends Component{
   
    renderLinks(links){
        return links.map((link,index)=>{
            return(
                <li key={index} className='tagA'>
                   <NavLink 
                   to={link.to}
                   exact={link.exact}
                   activeClassName='activ'
                   onClick={this.props.onClose}
                   >
                       {link.label}
                   </NavLink>
                </li>
            )
        })
    }

    render(){
         const cls=[
             'Drawer'
         ]
         
         if (!this.props.isOpen){
             cls.push('close')
         }


         const links=[
            {to:'/',label:'Список',exact:true},
         ]

         if (this.props.isAuthenticated){
            links.push({to:'/quiz-creator',label:'Создать тест',exact:false},
            {to:'/logout',label:'Выйти',exact:false},)
         }else{
            links.push({to:'/auth',label:'Авторизация',exact:false},)
         }


        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen
                ?<Backdrop onClick={this.props.onClose}/>
                :null}
            </React.Fragment>
        )
    }
}
export default Drawer