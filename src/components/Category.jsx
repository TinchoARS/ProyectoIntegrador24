function Category({name,description}) {
    return(<div className="category" style={{backgroundColor: 'red'}}>
        <h1>{name}</h1>
        <p>{description}</p>

    </div> );
}
export default Category;