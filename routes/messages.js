const   express = require('express'),
        router  = express.Router({mergeParams:true});

const { getMessages, 
        createMessage, 
        modifyMessage, 
        deleteMessage 
      } = require('../handlers/messages');

const {loginRequired, isAuthorized } = require('../middleware/auth')

router.get('/', getMessages);
router.use('/', loginRequired).route('/').post(createMessage);
router.use('/', loginRequired,isAuthorized)
        .route('/:id')
            .patch(modifyMessage)
            .delete(deleteMessage);

module.exports=router;