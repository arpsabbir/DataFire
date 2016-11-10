const datafire = require('../../index');
const fs = require('fs');
const hn = datafire.Integration.new('hacker_news');

const flow = module.exports =
      new datafire.Flow('copyStory', 'Copies the top HN story to a local file');

flow
  .step('stories', {
    operation: hn.get('/{storyType}stories.json'),
    params: {storyType: 'top'}
  })
  .step('story_details', {
    operation: hn.get('/item/{itemID}.json'),
    params: data => {
      return {itemID: data.stories[0]}
    }
  })
  .step('write_file', {
    operation: data => {
      fs.writeFileSync('./story.json', JSON.stringify(data.story_details, null, 2));
    }
  });
