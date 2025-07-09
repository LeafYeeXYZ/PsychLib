library(plumber)

# 定义一个 API
#* @post /execute
#* @param code 需要执行的 R 代码 (字符串)
#* @serializer unboxedJSON
function(req, res, code = "") {
  tryCatch({
    result <- eval(parse(text = code))
    list(
      status = "success",
      result = result
    )
  }, error = function(e) {
    res$status <- 500
    list(
      status = "error",
      message = e$message
    )
  })
}
