// pagination.helper.ts

export function getPagination(page = 1, limit = 10) {
  const take = Number(limit)
  const skip = (Number(page) - 1) * take

  return { skip, take }
}

export function getPaginationMeta(total: number, page = 1, limit = 10) {
  const totalPages = Math.ceil(total / limit)

  return {
    total,
    page,
    limit,
    totalPages
  }
}
