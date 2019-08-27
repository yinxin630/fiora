// import { configure, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// const popup = mount(
//     <Popup visible onClose={() => popup.setProps({ visible: false })}>
//         <p className="content">content</p>
//     </Popup>,
// );

// // toMatchSnapshot
// expect(popup).toMatchSnapshot({});

test('example', () => {
    expect(1 + 1).toBe(2);
});
