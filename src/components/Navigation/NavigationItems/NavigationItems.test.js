import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure( { adapter: new Adapter() } );

describe('Test <NavigationItems />', ()=>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    });

    it('Should render two <NavigationItem /> elements if not authenticated', ()=> {        
        expect( wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should render three <NavigationItem /> elements if authenticated', ()=> {        
        wrapper.setProps({ isAuthenticated: true });
        expect( wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('Find the <NavigationImen>Login <NavigationItem/>', ()=> {                
        expect( wrapper.contains(<NavigationItem link="/auth" >Login</NavigationItem> ) ).toBe(true);
    });

});