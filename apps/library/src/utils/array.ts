export class ArrayUtil {
  public static unique(array: (string | number)[]) {
    return [...new Set(array)]
  }

  public static objectUnique<T extends object>(array: T[], uniqeField: keyof T) {
    const set = [...new Set(array.map((a) => a[uniqeField]))]
    return set.map((t) => array.find((a) => (a[uniqeField] = t)))
  }
}
