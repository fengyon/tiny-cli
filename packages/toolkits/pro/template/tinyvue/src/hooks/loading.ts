import { ref } from 'vue';

/**
 * use logding hook
 * @param initValue 
 * @param closeDelay the dealy time of turning off loading to prevent ficker 
 * @returns
 */
export default function useLoading(initValue = false, closeDelay = 200) {
  let preOpenTime = Date.now();
  let closeTimer: ReturnType<typeof setTimeout> | null;
  const loading = ref(initValue);
  const setLoading = (value: boolean) => {
    if (value) {
      preOpenTime = Date.now();
    } else {
      const declinedTime = closeDelay - preOpenTime + Date.now();
      if (declinedTime > 0) {
        closeTimer ||
          (closeTimer = setTimeout(() => {
            loading.value = value;
            closeTimer = null;
          }, declinedTime));
        return;
      }
    }
    loading.value = value;
  };
  const toggle = () => {
    setLoading(!loading.value);
  };
  return [loading, setLoading, toggle];
}
