import Template from './template';

type PRecord<K extends string | number, V> = Partial<Record<K, V>>;

export default function TRecord<KT extends string | number, KM extends string | number, VT, VM>(
  keyTemplate: Template<KM, KT>,
  valueTemplate: Template<VM, VT>,
): Template<PRecord<KM, VM>, PRecord<KT, VT>> {
  return {
    valid: (o: any): o is PRecord<KT, VT> =>
      typeof o === 'object' && Object.keys(o).every(keyTemplate.valid) && Object.values(o).every(valueTemplate.valid),
    toModel: (o: PRecord<KT, VT>): PRecord<KM, VM> => {
      const model: PRecord<KM, VM> = {} as PRecord<KM, VM>;
      Object.entries(o).forEach(([key, value]) => {
        model[keyTemplate.toModel(key as KT)] = valueTemplate.toModel(value as VT);
      });
      return model;
    },
    toTransit: (o: PRecord<KM, VM>): PRecord<KT, VT> => {
      const transit: PRecord<KT, VT> = {} as PRecord<KT, VT>;
      Object.entries(o).forEach(([key, value]) => {
        transit[keyTemplate.toTransit(key as KM)] = valueTemplate.toTransit(value as VM);
      });
      return transit;
    },
  };
}
