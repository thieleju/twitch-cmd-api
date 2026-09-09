import { Request, Response, Router } from "express"
import Joi from "joi"
import { createValidator } from "express-joi-validation"
import { log } from "../utils"

const validator = createValidator({})
const router: Router = Router()

function toNumber(value: string): number | null {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function evaluateCondition(
  left: string,
  operator: string,
  right: string
): boolean {
  const normalizedOperator = operator.toLowerCase()
  const leftLower = left.toLowerCase()
  const rightLower = right.toLowerCase()

  switch (normalizedOperator) {
    case "eq":
      return left === right
    case "eqi":
      return leftLower === rightLower
    case "ne":
      return left !== right
    case "nei":
      return leftLower !== rightLower
    case "contains":
      return left.includes(right)
    case "containsi":
      return leftLower.includes(rightLower)
    case "startswith":
      return left.startsWith(right)
    case "startswithi":
      return leftLower.startsWith(rightLower)
    case "endswith":
      return left.endsWith(right)
    case "endswithi":
      return leftLower.endsWith(rightLower)
    case "gt": {
      const leftNum = toNumber(left)
      const rightNum = toNumber(right)
      return leftNum !== null && rightNum !== null && leftNum > rightNum
    }
    case "gte": {
      const leftNum = toNumber(left)
      const rightNum = toNumber(right)
      return leftNum !== null && rightNum !== null && leftNum >= rightNum
    }
    case "lt": {
      const leftNum = toNumber(left)
      const rightNum = toNumber(right)
      return leftNum !== null && rightNum !== null && leftNum < rightNum
    }
    case "lte": {
      const leftNum = toNumber(left)
      const rightNum = toNumber(right)
      return leftNum !== null && rightNum !== null && leftNum <= rightNum
    }
    default:
      return false
  }
}

router.get(
  "/:left/:operator/:right/:ifTrue/:ifFalse",
  validator.params(
    Joi.object({
      left: Joi.string().trim().required(),
      operator: Joi.string()
        .trim()
        .valid(
          "eq",
          "eqi",
          "ne",
          "nei",
          "contains",
          "containsi",
          "startswith",
          "startswithi",
          "endswith",
          "endswithi",
          "gt",
          "gte",
          "lt",
          "lte"
        )
        .required(),
      right: Joi.string().trim().required(),
      ifTrue: Joi.string().trim().required(),
      ifFalse: Joi.string().trim().required()
    })
  ),
  (req: Request, res: Response) => {
    const { left, operator, right, ifTrue, ifFalse } = req.params

    const matches = evaluateCondition(left, operator, right)
    const response = matches ? ifTrue : ifFalse

    log(
      `Conditional request ${left} ${operator} ${right} => ${matches ? "true" : "false"} | response: ${response}`
    )

    res.send(response)
  }
)

export default router
