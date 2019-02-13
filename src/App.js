import React, {Component} from 'react';
import './App.css';
import {Box, Grid, RoutedButton, Grommet, Button} from 'grommet';
import {Parallax, ParallaxLayer} from 'react-spring/addons';

// const Page = ({offset, caption, first, second, gradient, onClick}) => (
//     <React.Fragment>
//         <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
//             <div className="slopeBegin"/>
//         </Parallax.Layer>
//
//         <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
//             <div className={`slopeEnd ${gradient}`}/>
//         </Parallax.Layer>
//
//         <Parallax.Layer className="text number" offset={offset} speed={0.3}>
//             <span>0{offset + 1}</span>
//         </Parallax.Layer>
//
//         <Parallax.Layer className="text header" offset={offset} speed={0.4}>
//       <span>
//         <p style={{fontSize: 20}}>{caption}</p>
//         <div className={`stripe ${gradient}`}/>
//         <p>{first}</p>
//         <p>{second}</p>
//       </span>
//         </Parallax.Layer>
//     </React.Fragment>
// )

{/*<Parallax ref={ref => (this.parallax = ref)} pages={3}>*/}

class Page extends Component  {

render() {
    const { offset, caption, first, second, gradient, onClick } = this.props;

    return (
        <>
            <ParallaxLayer offset={offset}>

                <Parallax
                    className="page-container"
                    ref="page"
                    pages={3}
                    vertical
                    scrolling={true}
                >
                    <ParallaxLayer offset={0}>
                <span>
                    <p style={{fontSize: 20}}>{caption}</p>
                    <div className={`stripe ${gradient}`}/>
                    <p>{first}</p>
                    <p>{second}</p>
                </span>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1}>
                <span>
                    <p style={{fontSize: 20}}>{caption}</p>
                    <div className={`stripe ${gradient}`}/>
                    <p>{first}</p>
                    <p>{second}</p>
                </span>
                    </ParallaxLayer>
                </Parallax>

                <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
                    <div className="slopeBegin"/>
                </Parallax.Layer>

                <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
                    <div className={`slopeEnd ${gradient}`}/>
                </Parallax.Layer>

            </ParallaxLayer>

        </>
    )
}
}

const pages = ['home', 'services', 'contact'];

// colors
// https://coolors.co/05668d-028090-00a896-02c39a-f0f3bd

class App extends Component {
    goTo = to => e => this.refs.parallax.scrollTo(to);

    render() {
        return (
            <div className="App">
                <div style={{position: 'absolute', height: 40, width: '100%', zIndex: 100}}>
                <Box
                    gridArea='nav'
                    direction="row-responsive"
                    justify="center"
                    align="center"
                    background="#028090"
                    gap="small"
                >
                    <img style={{width: '75px', left: '1em', position: 'absolute'}}
                         src="https://ten-forward.com/static/10f-NO-DASH-cba956859cc858f55ec01d4ca432aa5e-ac1da.png"/>
                    <Button label="Work" onClick={this.goTo(0)} />
                    <Button label="About" onClick={this.goTo(1)} />
                    <Button label="Contact" onClick={this.goTo(2)} />
                </Box>
                </div>
                <Parallax
                    className="container"
                    ref="parallax"
                    pages={3}
                    horizontal
                    scrolling={false}
                >
                    {pages && pages.map((page, index) =>
                        <Page
                            key={`page-${page}`}
                            offset={index}
                            caption={page}
                            first="Lorem ipsum"
                            second="dolor sit"
                        />
                    )}
                </Parallax>
            </div>
        );
    }
}

export default App;
