import React, {Component} from 'react';
import './App.css';
import {Box, Grid, RoutedButton, Grommet, Button, Tab, Tabs, Text, Image} from 'grommet';
import {Parallax, ParallaxLayer} from 'react-spring/addons';
import * as contentful from 'contentful';
// import ApolloClient from "apollo-boost";

class Page extends Component  {

render() {
    const { offset, onClick, page } = this.props;
    const { sections } = page.fields;
    return (
        <>
            <ParallaxLayer offset={offset}>

                <Parallax
                    className="page-container"
                    ref="page"
                    pages={sections.length}
                    vertical
                    scrolling={true}
                >
                    {sections && sections.map((section, index) =>
                        <ParallaxLayer
                            key={`section-${index}`}
                            offset={index}
                        >

                            <Parallax.Layer offset={0.1} speed={0.1} style={{ opacity: 1 }}>
                                <Box className="box" style={{marginLeft: '80%', background: 'rgba(255,255,255,0.10)'}}/>
                                <Box className="box" style={{marginLeft: '70%', background: 'rgba(255,255,255,0.10)'}}/>
                                <Box className="box" style={{marginLeft: '85%', background: 'rgba(255,255,255,0.10)'}}/>
                            </Parallax.Layer>

                            <Grid
                                fill
                                rows={["1/3", "1/3", "1/3"]}
                                columns={["flex", "25%", "25%", "25%", "flex"]}
                                areas={[
                                    { name: "middle", start: [1, 1], end: [3, 1] },
                                    // { name: "left", start: [1, 1], end: [2, 1] },
                                    // { name: "right", start: [1, 1], end: [2, 1] },
                                ]}
                            >
                                <Box gridArea="middle" className="boxBg"/>
                                <Box
                                    gridArea="middle"
                                    // gridArea={(index%2 === 0) ? 'left' : 'right'}
                                    background="rgba(255,255,255,0.9)"
                                    pad="large"
                                >
                                    <Text color="#697f89" textAlign="start" size="large">
                                        {section.fields.content}
                                    </Text>
                                </Box>
                            </Grid>

                            <Parallax.Layer offset={-0.1} speed={0.1} style={{ opacity: 1 }}>
                                <Box className="box" style={{marginLeft: '35%', background: '#8EE3F555'}}/>
                                <Box className="box" style={{marginLeft: '30%', background: '#8EE3F525'}}/>
                            </Parallax.Layer>

                            {(index + 1 === sections.length) &&
                            <Parallax.Layer
                                offset={-0.05}
                                speed={0.05}
                                style={{ opacity: 1 }}
                            >
                                <Box
                                    justify="center"
                                    align="center"
                                    background="rgba(255,255,255,0.9)"
                                    pad="large"
                                >
                                    <Text color="#697f89">Footer</Text>
                                </Box>
                            </Parallax.Layer>
                            }
                        </ParallaxLayer>
                    )}
                </Parallax>

                <Parallax.Layer offset={offset} speed={0.2} onClick={onClick} style={{zIndex: '-100'}}>
                    <div className="slopeBegin"/>
                </Parallax.Layer>

                <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick} style={{zIndex: '-100'}}>
                    <div className={`slopeEnd gradient`}/>
                </Parallax.Layer>

            </ParallaxLayer>

        </>
    )
}
}

class App extends Component {
    state = {
        pages: [],
        activePage: 0
    }
    client = contentful.createClient({
        space: 'ikjhfs32iv4o',
        accessToken: '16980665c21e77f6046af60b75ce597250921926c3b4f2575e3682c5f3a9e2ef',
    })
    componentDidMount() {
        this.fetchPosts();
    }
    fetchPosts = () => {
        this.client.getEntries({
            'content_type': 'page'
        })
            .then( response => {
                this.setState({ pages: response.items })
            })
            .catch(console.error);
    }

    goTo = to => e => {
        this.refs.parallax.scrollTo(to);
        this.setState({
            activePage: to
        })
    }

    render() {
        const {pages, activePage} = this.state;

        return (
            <div className="App">
                <div style={{position: 'absolute', width: '100%', zIndex: 100}}>
                <Box
                    gridArea='nav'
                    direction="row-responsive"
                    justify="center"
                    align="center"
                    background="rgba(255,255,255,0.9)"
                    gap="small"
                    style={{padding: '1em'}}
                >
                    <img style={{width: '75px', left: '1em', position: 'absolute'}}
                         src="https://ten-forward.com/static/10f-NO-DASH-cba956859cc858f55ec01d4ca432aa5e-ac1da.png"/>
                    {pages && pages.map((page, index) =>
                        <Button
                            key={`header-${page.fields.title}`}
                            label={page.fields.title}
                            onClick={this.goTo(index)}
                            color="#8EE3F5"
                            plain={true}
                            style={{color: '#697f89', border: 'none', borderRadius: 0, fontSize: '1.5em', margin: '0 0.5em'}}
                            className={activePage === index ? 'navActive' : 'navInactive'}
                        />
                    )}
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
                            key={`page-${index}`}
                            offset={index}
                            page={page}
                        />
                    )}
                </Parallax>
            </div>
        );
    }
}

export default App;
