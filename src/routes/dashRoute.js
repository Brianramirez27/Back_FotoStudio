import { Router } from "express";
import * as dashController from "../controller/dashController.js"


const router = Router()

router.get("/year/", dashController.getSalesForYear )
router.get("/month/", dashController.getSalesForMonth )
router.get("/day/", dashController.getSalesForDay )
router.get("/item/:startDate/:endDate", dashController.getItemBestSeller)
router.get("/earnings/year/", dashController.getEarningsByYear)
router.get("/earnings/day/:id", dashController.getEarningsByDay )
router.get("/earnings/month/:id", dashController.getEarningsByMonth )

export {router}