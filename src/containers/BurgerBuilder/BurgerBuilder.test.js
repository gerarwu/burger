import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from '../../containers/BurgerBuilder/BurgerBuilder';
import BuildControls from '../../components/Burger/BuildConstrols/BuildControls';
import Burger from '../../components/Burger/Burger';

configure({ adapter: new Adapter() });

describe( "Burger builder test", ()=>{

    let wrapper;

    beforeEach(()=>{        
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
        wrapper.setProps({ ingr: {salad: 0} });
    });

    it("Has BurgerBuilder controls", ()=>{        
        expect( wrapper.find(BuildControls) ).toHaveLength(1);
    });

    it("has Burger ", ()=> {
        expect(wrapper.find(Burger)).toHaveLength(1);
    });

});