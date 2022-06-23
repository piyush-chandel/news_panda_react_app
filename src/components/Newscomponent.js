// import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Loading from './loading.gif';
import InfiniteScroll from "react-infinite-scroll-component";




export default function Newscomponent(props) {

    const [articles, setarticles] = useState([])
    const [totalResults, settotalResults] = useState(0);
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(true)
    const capitalise = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    



    const handleclick = async () => {
        console.log(page);
        props.setprogress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`

        props.setprogress(30);
        let data = await fetch(url)
        let parsedata = await data.json();
        props.setprogress(60);
        setloading(false);
        setarticles(parsedata.articles);
        settotalResults(parsedata.totalResults);
        setpage(page);

        props.setprogress(100);
        console.log(parsedata)

    }
    useEffect(() => {

  document.title=`${ capitalise( props.category)}-News Panda's`
        handleclick();



    }, []);

    const nextclick = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`
        setloading(true)
        let data = await fetch(url)
        let parsedata = await data.json();
        setloading(false)
        setpage(page + 1)
        settotalResults(parsedata.totalResults)
        setarticles(parsedata.articles)

    }

    const previousclick = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page - 1}&pageSize=${props.pageSize}`
        setloading(true)
        let data = await fetch(url)
        let parsedata = await data.json();
        setloading(false)
        setpage(page - 1)
        settotalResults(parsedata.totalResults)
        setarticles(parsedata.articles)

    }


    const fetchMoreData = async () => {
        
        setloading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}
        &page=${page+1}&pageSize=${props.pageSize}`
        setpage(page+1);
        let data = await fetch(url)
        let parsedata = await data.json();
        setloading(false)
        setarticles(articles.concat(parsedata.articles))
        settotalResults(parsedata.totalResults);
console.log(page);


    };




    return (
        <>
            <div className='container my-2'>
                <h2 className='text-center  ' style={{marginTop:"90px"}}>News Panda's--Top Headlines</h2>
                {loading && <div className='text-center'>
                    <img className="my-3" src={Loading} alt="loading" />
                </div>}


                <InfiniteScroll style={{ overflow: "none" }}
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<div className='text-center'>
                        <img className="my-3" src={Loading} alt="loading" />
                    </div>}
                >

                    <div className="container">
                        <div className='row'>

                            {articles.map((element) => {

                                return <div className='col-md-4' key={element.url} >

                                    <Newsitem title={element.title === null ? element.title : element.title.slice(0, 80)}
                                        description={element.description === null ? element.description : element.description.slice(0, 80)}
                                        imageUrl={element.urlToImage} url={element.url} author={element.author == null ? "bbc" : element.author}
                                        publishedAt={element.publishedAt} name={element.source.name} />
                                </div>



                            })}
                        </div>
                    </div>


                </InfiniteScroll>


                {/* <div className='container d-flex justify-content-between mt-3'>
                    <button disabled={page <= 1} onClick={previousclick} type="button" className="btn btn-danger">&laquo; Previous</button>
                    <button type="button" disabled={(page + 1) > Math.ceil(state.totalResults /  props.pageSize)} onClick={nextclick} className="btn btn-danger">Next &raquo;</button>
                </div> */}
           </div>



        </>
    );







}
Newscomponent.defaultProps = {
    category: "general",
    country: "in",

}


