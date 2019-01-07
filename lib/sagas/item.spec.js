import { mergeItems, fetchItems, fetchItemsForSale } from './item';

describe('mergeItems', () => {
  const prevItems = {
    a: { id: 'a', quality: 10, sellIn: 10, qualityTrend: 0, sellInTrend: 0 },
    b: { id: 'b', quality: 20, sellIn: 20, qualityTrend: 0, sellInTrend: 0 },
    c: { id: 'c', quality: 30, sellIn: 30, qualityTrend: 0, sellInTrend: 0 },
  };

  it('return an identical items set and 0,0,0 when no items have changed', () => {
    const [nextItems, added, removed, updated] = mergeItems(
      prevItems,
      Object.values(prevItems),
    );
    expect(nextItems).toEqual(prevItems);
    expect(added).toBe(0);
    expect(removed).toBe(0);
    expect(updated).toBe(0);
  });

  it('returns the new set and correct counts when items have been added', () => {
    const items = [
      ...Object.values(prevItems),
      { id: 'd', quality: 40, sellIn: 40 },
      { id: 'e', quality: 50, sellIn: 50 },
    ];
    const [nextItems, added, removed, updated] = mergeItems(prevItems, items);
    expect(nextItems).toMatchSnapshot();
    expect(added).toBe(2);
    expect(removed).toBe(0);
    expect(updated).toBe(0);
  });

  it('returns the new set and correct counts when items have been removed', () => {
    const items = [prevItems.a];
    const [nextItems, added, removed, updated] = mergeItems(prevItems, items);
    expect(nextItems).toMatchSnapshot();
    expect(added).toBe(0);
    expect(removed).toBe(2);
    expect(updated).toBe(0);
  });

  it('returns the new set and correct counts when items have been added and removed', () => {
    const items = [prevItems.a, { id: 'd', quality: 40, sellIn: 40 }];
    const [nextItems, added, removed, updated] = mergeItems(prevItems, items);
    expect(nextItems).toMatchSnapshot();
    expect(added).toBe(1);
    expect(removed).toBe(2);
    expect(updated).toBe(0);
  });

  it('returns the new set and correct counts when items have changed', () => {
    const items = [
      { id: 'a', quality: 99, sellIn: 10 },
      { id: 'b', quality: 20, sellIn: 99 },
      { id: 'c', quality: 30, sellIn: 30 },
    ];
    const [nextItems, added, removed, updated] = mergeItems(prevItems, items);
    expect(nextItems).toMatchSnapshot();
    expect(added).toBe(0);
    expect(removed).toBe(0);
    expect(updated).toBe(2);
  });
});

describe('fetchItems', () => {
  it('returns a json object containing all items returned by the API', async () => {
    expect(await fetchItems()).toMatchSnapshot();
  });
});

describe('fetchItemsForSale', () => {
  it('returns a json object containing only the sellable returned by the API', async () => {
    expect(await fetchItemsForSale()).toMatchSnapshot();
  });
});

// TODO Add specs for handleFetchItems
// TODO Add specs for itemsSaga
// TODO Add specs for fetchItemDetails
// TODO Add specs for handleFetchItemDetails
