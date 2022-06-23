// import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './loading.gif';
import InfiniteScroll from "react-infinite-scroll-component";


export class Newscomponent extends Component {
    static defaultProps = {
        category: "general",
        country: "in"

    }
   
  capitalise(str){
      return str.charAt(0).toUpperCase()+str.slice(1);
  }
    constructor(props) {
        super(props);
        console.log("hii ia ma constructor")
        this.state = {
            totalResults: 0,
            article: [],
            page: 1,
            loading: true

        }
        document.title=`${this.capitalise(this.props.category)}-News Panda's`
    }


    async componentDidMount(props) {
        this.props.setprogress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page }&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        this.props.setprogress(30);
        let data = await fetch(url)
        let parsedata = await data.json();
        this.props.setprogress(60);
        this.setState({ loading: false })

        this.setState({
            totalResults: parsedata.totalResults,
            page: this.state.page,
            article: parsedata.articles
        });
        this.props.setprogress(100);

    }


    // nextclick= async() => {
        
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
    //     this.setState({ loading: true })
    //     let data = await fetch(url)
    //     let parsedata = await data.json();
    //     this.setState({ loading: false })
    //     this.setState({
    //         page:this.state.page+1,
    //         totalResults: parsedata.totalResults,
    //         article: parsedata.articles
    //     });
    // }

    // previousclick=async() => {

    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page -1}&pageSize=${this.props.pageSize}`
    //     this.setState({ loading: true })
    //     let data = await fetch(url)
    //     let parsedata = await data.json();
    //     this.setState({ loading: false })
    //     this.setState({
    //         page:this.state.page-1,
    //         totalResults: parsedata.totalResults,
    //         article: parsedata.articles
    //     });
    // }


    fetchMoreData = async() => {
        this.setState({page:this.state.page+1,})

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page }&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedata = await data.json();
        this.setState({ loading: false })
        this.setState({
            // totalResults: parsedata.totalResults,
            page: this.state.page,
            article: this.state.article.concat(parsedata.articles)
        });


      };


    render() {

        return (
            <div className='container my-2'>
                <h2 className='text-center my-3'>News Panda's--Top Headlines</h2>
                { this.state.loading && <div className='text-center'>
         <img  className="my-3" src={Loading} alt="loading" />
      </div>}


                <InfiniteScroll style={{overflow:"none"}}
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length!==this.state.totalResults}
          loader={  <div className='text-center'>
         <img  className="my-3" src={Loading} alt="loading" />
      </div>}
        >


                <div className='row '>
                    {this.state.article.map((element) => {

                        return <div className='col-md-4' key={element.url}>

                            <Newsitem title={element.title === null ? element.title : element.title.slice(0, 80)} 
                            description={element.description === null ? element.description : element.description.slice(0, 80)} 
                            imageUrl={element.urlToImage} url={element.url} author={element.author == null ? "bbc" : element.author}
                            publishedAt={element.publishedAt} name={element.source.name} />
                        </div>



                    })}
                </div>


                </InfiniteScroll>


                {/* <div className='container d-flex justify-content-between mt-3'>
                    <button disabled={this.state.page <= 1} onClick={this.previousclick} type="button" className="btn btn-danger">&laquo; Previous</button>
                    <button type="button" disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.nextclick} className="btn btn-danger">Next &raquo;</button>
                </div> */}
            </div>




        );






    }
}

export default Newscomponent
