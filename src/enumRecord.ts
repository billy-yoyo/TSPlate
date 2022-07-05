import TEnum from './enum';
import TRecord from './record';
import Template, { DeepPartial, toPartial } from './template';

export default function TEnumRecord<K extends string, VT, VM>(
  keys: readonly K[],
  valueTemplate: Template<VM, VT>,
): Template<Record<K, VM>, Record<K, VT>> {
  return {
    valid: (o: any): o is Record<K, VT> =>
      typeof o === 'object' && o !== null && keys.every((key) => valueTemplate.valid(o[key])),
    toModel: (o: Record<K, VT>): Record<K, VM> => {
      const model: Record<K, VM> = {} as Record<K, VM>;
      keys.forEach((key) => {
        model[key] = valueTemplate.toModel(o[key]);
      });
      return model;
    },
    toTransit: (o: Record<K, VM>): Record<K, VT> => {
      const transit: Record<K, VT> = {} as Record<K, VT>;
      keys.forEach((key) => {
        transit[key] = valueTemplate.toTransit(o[key]);
      });
      return transit;
    },
    toPartialTemplate: () => {
      return (TRecord(TEnum(...keys), toPartial(valueTemplate)) as any) as Template<
        DeepPartial<Record<K, VM>>,
        DeepPartial<Record<K, VT>>
      >;
    },
  };
}
