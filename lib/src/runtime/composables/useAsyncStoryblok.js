import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import { useAsyncData, useState, onMounted } from "#imports";

export const useAsyncStoryblok = async (
  url,
  apiOptions = {},
  bridgeOptions = {}
) => {
  const story = useState(url, () => null);
  const storyblokApiInstance = useStoryblokApi();

  onMounted(() => {
    if (story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        (evStory) => (story.value = evStory),
        bridgeOptions
      );
    }
  });

  const { data } = await useAsyncData(
    url,
    async () => await storyblokApiInstance.get(`cdn/stories/${url}`, apiOptions)
  );

  story.value = data.value.data.story;

  return story;
};
