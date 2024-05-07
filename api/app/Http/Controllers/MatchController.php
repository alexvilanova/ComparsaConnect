<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;
use Carbon\Carbon;

class MatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function matches()
    {
        $userId = Auth::id();
        $profile = Profile::where("user_id", $userId)->first();

        if (!$profile) {
            return response()->json(['error' => 'No tienes perfil'], 404);
        }

        $userBirthdate = Carbon::parse($profile->birthdate);
        $userAge = $userBirthdate->age;

        $genderPref = $profile->gender_pref;
        $bandera = $profile->bandera;

        $query = Profile::where('id', '!=', $profile->id);

        if ($genderPref != 1) {
            $query->where('gender', $genderPref);
            $query->where('gender_pref', $profile->gender);
        }

        if ($bandera != 1) {
            $query->where('bandera', $bandera);
        }

        $otrosPerfiles = $query->get();

        $perfilesConPorcentaje = [];

        $coincidencias = 0;

        foreach ($otrosPerfiles as $perfil) {

            if ($profile->gender == $perfil->gender) {
                $coincidencias += 33;
            }

            if ($profile->bandera == $perfil->bandera) {
                $coincidencias += 33;
            }

            $perfilBirthdate = Carbon::parse($perfil->birthdate);
            $perfilAge = $perfilBirthdate->age;

            $diferenciaEdad = abs($userAge - $perfilAge);
            if ($diferenciaEdad <= 5) {
                $coincidencias += 33;
            }

            $perfilesConPorcentaje[] = [
                'perfil' => $perfil,
                'porcentaje' => $coincidencias
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $perfilesConPorcentaje,
            'edad' => $diferenciaEdad
        ]);
    }
}
