import React,{Component} from 'react';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

const links=[
    {to:'/',label:'Список',exact:true},
    {to:'/auth',label:'Авторизация',exact:false},
    {to:'/quiz-creator',label:'Создать тест',exact:false},
]

class Drawer extends Component{
   
    renderLinks(){
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

        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
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