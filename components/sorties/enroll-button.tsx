'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { UserPlus, UserMinus, Users } from 'lucide-react'

interface EnrollmentButtonProps {
  isEnrolled: boolean
  onEnrollmentChange: (() => void) | undefined
  currentEnrollment: number
  maxEnrollment: number | null
}

export function EnrollmentButton({
  isEnrolled,
  onEnrollmentChange,
  currentEnrollment,
  maxEnrollment
}: EnrollmentButtonProps) {
  return (
    <Button
      className="w-full bg-[#2f3570] hover:bg-[#4a5180] text-white"
      onClick={onEnrollmentChange}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {isEnrolled ? (
            <>
              <UserMinus className="w-5 h-5 mr-2" />
              <span>Se désinscrire</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 mr-2" />
              <span>S'inscrire</span>
            </>
          )}
        </div>
        {maxEnrollment && (
          <div className="flex items-center bg-white bg-opacity-20 rounded px-2 py-1">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {currentEnrollment}/{maxEnrollment}
            </span>
          </div>
        )}
      </div>
    </Button>
  )
}