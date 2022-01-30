    .ticket_info_area {
      width: 400px;
      height: 200px;
      background-color: #eee;
      position: absolute;
      left: 0;
      top: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
      width: 6px;
       background-color: #eee;
      }
      &::-webkit-scrollbar-track {
       border-radius: 10px;
      background-color: #eee;
      }
       &::-webkit-scrollbar-thumb {
         background-color: #c7c7c7;
         border-radius: 50px;
         height: 150px;
       }
       &::-webkit-scrollbar-thumb:hover {
         background-color: #eee;
       }
    }
