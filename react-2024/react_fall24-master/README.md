## App Routes

- npm i react-router-dom
- Pages: Homepage, About, Login, Register ....
- App: useRoutes: [
  {path, element}
  ]
- main: BrowserRouter (App)
- Components: Header, Footer, ProductCard, ProductList
- Su dung Link to, ko bi load lai trang

## Homepage

- state: products
- Services: getAllProduct: return axios.get(API_URL)
- Call API: then.catch()
- Render UI: products.map()

## JSON Server

- npm i -D json-server @0.17.4
- db.json
  {
  "products": []
  }
- script trong package.json: "server": "json-server db.json"

## ProductDetail

- pages/ProductDetail.tsx
- route: path, element
- service: getProductDetail
- call API
- Render UI
