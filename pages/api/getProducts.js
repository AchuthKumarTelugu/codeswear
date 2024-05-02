import connectDb from "@/middleware/mongoose";
import Product from "@/modals/Product";
const handler  = async (req,res) => {
  let products=await Product.find({})
  let tshirts={}  //key is tshirt title and value is its whole object,goal here is to know availability of different colors and sizes
  for(let item of products) {
    if(item.title in tshirts){
        if(item.availableQty > 0) { //if its availbility is greater than 0 ,then if this new items size or color is not there in previous one,we will push it in them
          if(!tshirts[item.title].color.includes(item.color)) {
            tshirts[item.title].color.push(item.color);
          }
          if(!tshirts[item.title].size.includes(item.size)) {
            tshirts[item.title].size.push(item.size);
          }
        }
        
    }else {
      tshirts[item.title]=JSON.parse(JSON.stringify(item))
      if(item.availableQty > 0) { //if available qty is more than 0 ,then we make size and color properties as arrays
          tshirts[item.title].color=item.color.split(' ')
          tshirts[item.title].size=item.size.split(' ')
      }
    }
  }
  // res.status(200).json({products})
  res.status(200).json({tshirts})

}
export default connectDb(handler)
