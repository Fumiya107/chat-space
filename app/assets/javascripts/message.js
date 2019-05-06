$(function(){
function buildHTML(message){
    var image = (message.image) ? `<img src=${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__content">
                      ${ message.content }
                    </div>
                    ${ image }
                  </div>
                </div>`
    return html;
  }

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
}

    $('.new_message').on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action')
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
    })
        .done(function(data){
            if (data.length !== 0) {
            var html = buildHTML(data);
            $('.messages').append(html);
            $('.form__submit').prop('disabled', false);
            $('.new_message')[0].reset();
            scroll()
            }
            else {
                alert('メッセージを入力してください');
            }
        })
        .fail(function(){
            $('.form__submit').prop('disabled', false);
            alert('error');
        })
    })
        var reloadMessages = function() {
            //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
            last_message_id = $(".message").last().data('message-id');
            var href = 'api/messages'
            $.ajax({
            //ルーティングで設定した通りのURLを指定
            url: href,
            //ルーティングで設定した通りhttpメソッドをgetに指定
            type: 'get',
            dataType: 'json',
            //dataオプションでリクエストに値を含める
            data: {id: last_message_id}
            })
            .done(function(messages) {
                var insertHTML = '';
                messages.forEach(function(message) {
                    $('.messages').append(buildHTML(message));
                    scroll();
                  })
            })
            .fail(function() {
            alert('自動更新に失敗しました');
            });
        };
        setInterval(reloadMessages, 4000);
});
