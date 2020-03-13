import React from 'react';
import s from './PortfolioSets.module.scss'
import {NavLink} from "react-router-dom";
import {simplePrice} from "../../utils/decorators";

export const PortfolioSets = (props) => {
    const {portfolio,selectedPortfolioId} = props;
    const {handleSetSelection,handleAddPortfolio,getPortfolioSetValue} = props;

    const portfolioIds = portfolio.allIds;
    return (
        <div className={s.portfolio_sets}>
            <a className={s.add} onClick={()=> { handleAddPortfolio() }}>+ Add Set</a>
            <h4>Portfolio:</h4>
            <ul>
                <li className={s.all}>
                    <NavLink exact={true} to="/" activeClassName={s.active} onClick={()=> { handleSetSelection(null) }} >
                        <h5>All assets</h5>
                    </NavLink>
                </li>
                {
                    portfolioIds.map( portfolioId => {
                        const set = portfolio.byIds[portfolioId];
                        const v = getPortfolioSetValue(portfolioId);
                        const value = simplePrice(v,1);
                        return (<li>
                            <NavLink to={"/portfolio-set/"+portfolioId} activeClassName={s.active} isActive={ () => (portfolioId == selectedPortfolioId) } onClick={()=> { handleSetSelection(portfolioId) }}>
                                <h5>{set.name}</h5>
                                <div className={s.info}>
                                    {/*TODO: here*/}
                                    <span className={s.value}><strong>{value}</strong></span>
                                    <span className={s.amount}>Assets #:<strong>{set.assets.length}</strong></span>
                                </div>
                            </NavLink>
                        </li>);
                        }
                    )
                }
            </ul>
        </div>
    );
};