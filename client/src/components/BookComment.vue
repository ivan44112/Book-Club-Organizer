<template>
  <div class="comments-container">
    <div class="comment">
      <p class="comment-author">Adam Smith:</p>
      <p class="comment-text">I really like this Eddard Stark so far.</p>
      <!-- <button class="reply-button">reply</button> -->
    </div>
    <div class="new-comment">
      <form>
        <p class="comment-author">John Doe:</p>
        <textarea required class="new-comment-textarea"/>
        <input class="submit-comment-button" type="submit" value="Add Comment">
      </form>
    </div>
  </div>
</template>

<script>
export default {
name: "BookComment"
}
</script>

<style scoped>
.comments-container{
  padding: 20px 30px;
  margin-bottom: 70px;
  width: calc(100% - 190px);
  flex-direction: column;
  display: flex;
}
.comment{
  text-align: left;
  background: #F8F8F8;
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
}
.comment-author{
  font-weight: bold;
  margin: 10px 0;
}
.comment-text{
  margin: 10px 0;
}
.reply-button{
  border:none;
  background: white;
  color:#0072D5;
  font-weight: bold;
  align-self: flex-end;
  outline: none;
  cursor: pointer;
  margin: 0 5px 5px 0;
}

.new-comment{
  padding: 0 10px;
}
.new-comment form{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.submit-comment-button{
  margin-top:10px;
  border: none;
  width: 120px;
  height: 33px;
  background: #0072D5;
  border-radius: 3px;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}
.new-comment-textarea{
  color: #434343;
  outline:0;
  height: 70px;
  border-radius: 5px;
  resize: none;
  border-color:#cccccc;
  width: 100%;
}
</style>